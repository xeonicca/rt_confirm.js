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
    buttonClass: "rt-button",
    display: false
  };

  function Plugin( element, options ){
    this.el = element;
    this.$el = $(element);
    this.options = $.extend( {}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.uid = prefix + uid;
    return this.init();
  };

  Plugin.prototype.init = function(){
    var 
    template =   '<div class=\"rt-modal\" uid=\"' + this.uid + '\">';
    template +=  '  <div class=\"modal-container\">';
    if( this.options.title !== '' ){
      template +=  '    <span class=\"modal-title\">' + this.options.title + '<\/span>';
    }
    template +=  '    <div class=\"modal-content\">';
    template +=  '      <p class=\"modal-text\">' + this.options.text + '<\/p>';
    template +=  '      <div class=\"modal-button-container\">';
    template +=  '        <button data=\"confirm\" class=\"' + this.options.buttonClass + '\">' + this.options.confirmButton + '<\/button>';
    template +=  '        <button data=\"cancel\"  class=\"' + this.options.buttonClass + '\">' + this.options.cancelButton + '<\/button>';
    template +=  '      <\/div>';
    template +=  '    <\/div>';
    template +=  '  <\/div>';
    template +=  '<\/div>';
    this.$template = $( template );
    this.bind();
    return this.render( this.options.display );
  };

  Plugin.prototype.bind = function(){
    var _self = this;
    _self.$el.bind( 'click', _self.render( _self.display ) );

    _self.$template.bind( 'rt-confirm-show', function(){
      $('body').append( _self.$template.show() );
    });

    _self.$template.bind( 'rt-confirm-hide', function(){
      _self.$template.remove();
    });
  };

  Plugin.prototype.render = function( toggle ){
    this.display = !toggle;
    toggle? this.$template.trigger('rt-confirm-show') : this.$template.trigger( 'rt-confirm-hide' );
    return this;
  };

  $.fn.rtConfirm = function( options ){
    return this.each( function(){
      if( typeof $(this).attr('uid') !== 'undefined' ){
        return $.data( document.body, $(this).attr('uid') ).bind().$el;
      }else{
        uid += 1;
        var newConfirm = new Plugin( this, options );
        $.data( document.body, newConfirm.uid , newConfirm );
        return newConfirm.$el;
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