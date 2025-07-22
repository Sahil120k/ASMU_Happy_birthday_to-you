/**
 * Birthday Card Interactive Controller
 * Handles the opening and closing animations of the birthday card
 * with smooth transitions and proper event management
 */
(function() {
  'use strict';
  
  // Utility function for safe element selection
  function $(id) {
    return document.getElementById(id);
  }
  
  // Card controller object
  const CardController = {
    // DOM elements
    card: null,
    openButton: null,
    closeButton: null,
    playMusicButton: null,
    
    // State management
    isOpen: false,
    isAnimating: false,
    
    // Initialize the card controller
    init: function() {
      this.cacheElements();
      this.bindEvents();
      this.setupInitialState();
    },
    
    // Cache DOM elements for better performance
    cacheElements: function() {
      this.card = $('card');
      this.openButton = $('open-card');
      this.closeButton = $('close-card');
      this.playMusicButton = $('play-birthday-music');
      
      // Log any missing elements for debugging
      if (!this.card) console.warn('Birthday card element not found');
      if (!this.openButton) console.warn('Open button element not found');
      if (!this.closeButton) console.warn('Close button element not found');
    },
    
    // Bind event listeners
    bindEvents: function() {
      // Open card button
      if (this.openButton) {
        this.openButton.addEventListener('click', this.openCard.bind(this));
      }
      
      // Close card button
      if (this.closeButton) {
        this.closeButton.addEventListener('click', this.closeCard.bind(this));
      }
      
      // Play music button
      if (this.playMusicButton) {
        this.playMusicButton.addEventListener('click', this.playBirthdayMusic.bind(this));
      }
      
      // Keyboard navigation
      document.addEventListener('keydown', this.handleKeyboard.bind(this));
      
      // Prevent body scroll when card is open
      document.addEventListener('scroll', this.handleScroll.bind(this));
    },
    
    // Setup initial state
    setupInitialState: function() {
      if (this.card) {
        // Hide card initially, will be shown when needed
        this.card.style.display = 'none';
      }
    },
    
    // Show the card
    showCard: function() {
      if (this.card) {
        this.card.style.display = 'block';
        // Add fade-in animation
        this.card.style.opacity = '0';
        this.card.style.transform = 'scale(0.9)';
        
        // Trigger animation
        requestAnimationFrame(() => {
          this.card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          this.card.style.opacity = '1';
          this.card.style.transform = 'scale(1)';
        });
      }
    },
    
    // Open the card with animation
    openCard: function() {
      if (this.isAnimating || this.isOpen || !this.card) return;
      
      this.isAnimating = true;
      
      // Add opened class for 3D flip animation
      this.card.classList.add('opened');
      
      // Update state after animation completes
      setTimeout(() => {
        this.isOpen = true;
        this.isAnimating = false;
        
        // Focus on close button for accessibility
        if (this.closeButton) {
          this.closeButton.focus();
        }
        
        // Trigger message animations
        this.animateMessages();
        
      }, 800); // Match CSS transition duration
      
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    },
    
    // Close the card with animation
    closeCard: function() {
      if (this.isAnimating || !this.isOpen || !this.card) return;
      
      this.isAnimating = true;
      
      // Remove opened class for 3D flip animation
      this.card.classList.remove('opened');
      
      // Update state after animation completes
      setTimeout(() => {
        this.isOpen = false;
        this.isAnimating = false;
        
        // Focus on open button for accessibility
        if (this.openButton) {
          this.openButton.focus();
        }
        
      }, 800); // Match CSS transition duration
      
      // Re-enable body scroll
      document.body.style.overflow = '';
    },
    
    // Animate message cards with staggered entrance
    animateMessages: function() {
      const messageCards = document.querySelectorAll('.message-card');
      const signature = document.querySelector('.message-signature');
      const actions = document.querySelector('.card-actions');
      
      // Reset animations
      messageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
      });
      
      if (signature) {
        signature.style.opacity = '0';
        signature.style.transform = 'translateY(30px)';
      }
      
      if (actions) {
        actions.style.opacity = '0';
        actions.style.transform = 'translateY(30px)';
      }
      
      // Animate cards with staggered timing
      messageCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
      });
      
      // Animate signature
      if (signature) {
        setTimeout(() => {
          signature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          signature.style.opacity = '1';
          signature.style.transform = 'translateY(0)';
        }, (messageCards.length + 1) * 200);
      }
      
      // Animate actions
      if (actions) {
        setTimeout(() => {
          actions.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          actions.style.opacity = '1';
          actions.style.transform = 'translateY(0)';
        }, (messageCards.length + 2) * 200);
      }
    },
    
    // Handle keyboard navigation
    handleKeyboard: function(event) {
      switch(event.key) {
        case 'Escape':
          if (this.isOpen) {
            this.closeCard();
          }
          break;
        case 'Enter':
        case ' ':
          if (event.target === this.openButton && !this.isOpen) {
            event.preventDefault();
            this.openCard();
          } else if (event.target === this.closeButton && this.isOpen) {
            event.preventDefault();
            this.closeCard();
          }
          break;
      }
    },
    
    // Handle scroll prevention when card is open
    handleScroll: function(event) {
      if (this.isOpen) {
        event.preventDefault();
      }
    },
    
    // Play birthday music
    playBirthdayMusic: function() {
      const audio = document.querySelector('.song');
      if (audio) {
        if (audio.paused) {
          audio.play().catch(e => {
            console.log('Audio playback failed:', e);
            // Show user-friendly message
            this.showAudioMessage('Click anywhere to enable audio playback');
          });
        } else {
          audio.pause();
        }
        
        // Update button text
        if (this.playMusicButton) {
          const buttonText = audio.paused ? '🎵 Play Birthday Song' : '⏸️ Pause Music';
          this.playMusicButton.textContent = buttonText;
        }
      }
    },
    
    // Show audio message to user
    showAudioMessage: function(message) {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        z-index: 10000;
        font-family: 'Pacifico', cursive;
      `;
      
      document.body.appendChild(messageDiv);
      
      setTimeout(() => {
        messageDiv.remove();
      }, 3000);
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', CardController.init.bind(CardController));
  } else {
    CardController.init();
  }
  
  // Make CardController globally available for debugging
  window.CardController = CardController;
  
})();
