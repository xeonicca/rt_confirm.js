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
    confirmButton: "Yes",
    cancelButton: "Cancel",
    buttonClass: "rt-button"
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
    var _self = this,
    template =   '<div class=\"rt-modal\" uid=\"' + _self.uid + '\">';
    template +=  '  <div class=\"rt-modal-container\">';
    if( _self.options.title !== '' ){
      template +=  '    <span class=\"rt-modal-title\">' + _self.options.title + '<\/span>';
    }
    template +=  '    <div class=\"rt-modal-content\">';
    template +=  '      <p class=\"rt-modal-text\">' + _self.options.text + '<\/p>';
    template +=  '      <div class=\"rt-modal-button-container\">';
    template +=  '        <button data=\"confirm\" class=\"' + _self.options.buttonClass + '\">' + _self.options.confirmButton + '<\/button>';
    template +=  '        <button data=\"cancel\"  class=\"' + _self.options.buttonClass + '\">' + _self.options.cancelButton + '<\/button>';
    template +=  '      <\/div>';
    template +=  '    <\/div>';
    template +=  '  <\/div>';
    template +=  '<\/div>';
    _self.$template = $( template );
    _self.$el.bind( 'click', function(){
      _self.toggleConfirm();
    });
  };


  Plugin.prototype.toggleConfirm = function(){
    var _self = this;
    if( _self.display ){
      _self.$template.on( 'click', 'button[data]', function(){
        if( $(this).attr('data') ==='confirm'){
          _self.accept = true;
        }
        if( $(this).attr('data') ==='cancel'){
          _self.accept = false;
        }
        _self.toggleConfirm();
      });
      $('body').append( _self.$template.show() );
    }else{
      _self.$template.remove();
      _self.onClose();
    }
    _self.display = !_self.display;
  }

  // Plugin.prototype.render = function(){
  //   this.display? this.$template.trigger('rt-confirm-show') : this.$template.trigger( 'rt-confirm-hide' );
  //   this.display = !this.display;
  //   return this;
  // };

  Plugin.prototype.onClose = function(){
    if( typeof this.options.close === 'function' ){
      this.options.close.call( this.$el, this.accept );
    }
  };

  $.fn.rtConfirm = function( options ){
    return this.each( function(){
      if( typeof $(this).attr('uid') !== 'undefined' ){
        $.data( document.body, $(this).attr('uid') );
      }else{
        uid += 1;
        var newConfirm = new Plugin( this, options );
        $.data( document.body, newConfirm.uid , newConfirm );
      }
    });
  };
  
  // var show = function() {
  //    var _self = this;

  //    if( _self.settings.overlay ){
  //      var $overlay = $('<div />');
  //      $overlay.css({
  //        'position':'fixed',
  //        'top':0,
  //        'left':0,
  //        'background-color': 'rgba(75,75,75,0.6)',
  //        'height' :'100%',
  //        'width' : '100%'
  //      })
  //      _self.$el.wrap( $overlay );
  //    }

  //    _self.$el.trigger('show-confirm');
  //  };

   
})(jQuery, RT);