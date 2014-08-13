/**
 * Ruten Confirm dialog
 *
 * A simple and colorized version of confirm dialouge for RUTEN
 *   will support:
 *     - inline attribute as option
 *     - custom option
 *     - custom button text and prompt message
 *     - custom button class
 *     - onclosing event for confirm and cancel and both
 *  
 */
;(function($, namespace){

  /**
   * Globally defined rules
   */
  var pluginName = 'rtConfirm',
  uid = 0,
  prefix = '__rt_confirm_',
  defaults = {
    text: "Are you sure?",
    title: "",
    alert: false,
    confirmButton: "Yes",
    cancelButton: "Cancel",
    buttonClass: "rt-button",
    exitOnESC: false,
    overlay: true
  };

  function Plugin( element, options ){
    this.el = element;
    this.$el = $(element);
    this.options = $.extend( {}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.uid = prefix + uid;
    this.display = true;
    this.init();
    return this.$el;
  };

  Plugin.prototype.init = function(){
    var self = this,
    template =   '<div class=\"rt-modal\" uid=\"' + self.uid + '\">';
    template +=  '  <div class=\"rt-modal-container\">';
    if( self.options.title !== '' ){
      template +=  '    <p class=\"rt-modal-title\">' + self.options.title + '<\/p>';
    }
    template +=  '    <div class=\"rt-modal-content\">';
    template +=  '      <p class=\"rt-modal-text\">' + self.options.text + '<\/p>';
    template +=  '      <div class=\"rt-modal-button-container\">';
    template +=  '        <button data=\"confirm\" class=\"' + self.options.buttonClass + '\">' + self.options.confirmButton + '<\/button>';
    if( !self.options.alert ){
      template +=  '        <button data=\"cancel\"  class=\"' + self.options.buttonClass + '\">' + self.options.cancelButton + '<\/button>';
    }
    template +=  '      <\/div>';
    template +=  '    <\/div>';
    template +=  '  <\/div>';
    template +=  '<\/div>';

    var $overlay = $('<div />');
    $overlay.css({
      'position':'fixed',
      'top':0,
      'left':0,
      'background-color': 'rgba(75,75,75,0.6)',
      'height' :'100%',
      'width' : '100%'
    });

    self.$template = $( template ).remove('script');
    if( self.options.overlay ){
      self.$template = $overlay.append( self.$template );
    }
    self.$el.bind( 'click', function(){
      self.toggle();
    });

    $('body').on( 'click', '.rt-modal[uid=' + self.uid + '] button[data]', function(){
      if( $(this).attr('data') ==='confirm'){
        self.accept = true;
      }
      if( $(this).attr('data') ==='cancel'){
        self.accept = false;
      }
      self.toggle();
    });
  };


  Plugin.prototype.toggle = function(){
    var self = this;
    if( self.display ){
      self.onOpen();
      $(document).on( 'keyup', function( e ){
        if( e.keyCode == 27 ){
          self.$template.remove();
          self.display = true;
        }
      });
      self.$template.find('.rt-modal').show().end().appendTo( 'body' );
      if( self.options.overlay ){
        self.$template = self.$template.wrap( self.$overlay );
      }
    }else{
      self.$template.remove();
      self.onClose();
    }
    self.display = !self.display;
  }

  Plugin.prototype.onClose = function(){
    if( typeof this.options.close === 'function' ){
      this.options.close.call( this.$el, this.accept );
    }
  };

  Plugin.prototype.onOpen = function(){
    if( typeof this.options.open === 'function' ){
      this.options.open.call( this.$el, this.accept );
    }
  }

  $.fn.rtConfirm = function( options ){
    return this.each( function(){
      if( typeof $(this).attr('uid') !== 'undefined' ){
        var plugin = $.data( document.body, $(this).attr('uid') );
      }else{
        uid += 1;
        var newConfirm = new Plugin( this, options );
        $.data( document.body, newConfirm.uid , newConfirm );
      }
    });
  };

})(jQuery, RT);
