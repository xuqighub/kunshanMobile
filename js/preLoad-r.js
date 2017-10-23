/**
 * Created by test on 2017/9/4.
 */



(function ($) {
    function PreLoad(imgs,options) {
        this.imgs = typeof imgs == 'string' ? [imgs] : imgs;
        this.opts = $.extend({},PreLoad.DEFAULTS , options);

        if(this.opts.method == 'ordered'){
            this._ordered();
        }else{
            this._unordered();
        }
    }
    PreLoad.DEFAULTS={
        method:'unordered',
        each:null,
        all:null
    }

    PreLoad.prototype._ordered=function () {
        var imgs = this.imgs,
            opts = this.opts,
            len = imgs.length,
            count = 0;

        load();

        function load() {
            var imgObj = new Image();
            $(imgObj).on('load error',function () {
                opts.each && opts.each(count);

                if(count > len-1){
                    opts.all && opts.all();
                }else{
                    load();
                }
                count ++;
            });
            imgObj.src = imgs[count];
        }
    }

    PreLoad.prototype._unordered=function () {
        var imgs = this.imgs,
            opts = this.opts,
            len = imgs.length,
            count = 0;


        $.each(imgs,function (index,src) {
            if(typeof src != 'string'){
                return;
            }
            var imgObj = new Image();
            $(imgObj).on('load error',function () {
                opts.each && opts.each(count);

                if(count >= len-1){
                    opts.all && opts.all();
                }
                count++;
            });
            imgObj.src = src;
        });
    }

    $.extend({
        preload:function (imgs,options) {
            new PreLoad(imgs,options);
        }
    })

})(jQuery)