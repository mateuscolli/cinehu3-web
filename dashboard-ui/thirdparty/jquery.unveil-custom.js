﻿/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

(function () {

    /**
    * Copyright 2012, Digital Fusion
    * Licensed under the MIT license.
    * http://teamdf.com/jquery-plugins/license/
    *
    * @author Sam Sehnert
    * @desc A small plugin that checks whether elements are within
    *       the user visible viewport of a web browser.
    *       only accounts for vertical position, not horizontal.
    */

    var thresholdX = Math.max(screen.availWidth);
    var thresholdY = Math.max(screen.availHeight);

    function visibleInViewport(elem, partial) {

        thresholdX = thresholdX || 0;
        thresholdY = thresholdY || 0;

        var vpWidth = window.innerWidth,
            vpHeight = window.innerHeight;

        // Use this native browser method, if available.
        var rec = elem.getBoundingClientRect(),
            tViz = rec.top >= 0 && rec.top < vpHeight + thresholdY,
            bViz = rec.bottom > 0 && rec.bottom <= vpHeight + thresholdY,
            lViz = rec.left >= 0 && rec.left < vpWidth + thresholdX,
            rViz = rec.right > 0 && rec.right <= vpWidth + thresholdX,
            vVisible = partial ? tViz || bViz : tViz && bViz,
            hVisible = partial ? lViz || rViz : lViz && rViz;

        return vVisible && hVisible;
    }

    var unveilId = 0;

    function isVisible(elem) {
        return visibleInViewport(elem, true);
    }

    function fillImage(elem) {
        var source = elem.getAttribute('data-src');
        if (source) {
            ImageStore.setImageInto(elem, source);
            elem.setAttribute("data-src", '');
        }
    }

    function unveilElements(elems, parent) {

        if (!elems.length) {
            return;
        }

        var images = elems;

        unveilId++;

        var parents = [];
        if (parent) {
            parents = parent.querySelectorAll('.itemsContainer');
            if (!parents.length) {
                parents = [parent];
            }
        }

        function unveil() {

            var remaining = [];

            for (var i = 0, length = images.length; i < length; i++) {
                var img = images[i];
                if (isVisible(img)) {
                    fillImage(img);
                } else {
                    remaining.push(img);
                }
            }

            images = remaining;

            if (!images.length) {
                document.removeEventListener('scroll', unveil);
                window.removeEventListener('resize', unveil);
                bindEvent(parents, 'removeEventListener', 'scroll', unveil);
            }
        }

        document.addEventListener('scroll', unveil);
        window.addEventListener('resize', unveil);

        if (parents.length) {
            bindEvent(parents, 'addEventListener', 'scroll', unveil);
        }

        unveil();
    }

    function bindEvent(elems, method, name, fn) {

        for (var i = 0, length = elems.length; i < length; i++) {
            elems[i][method](name, fn);
        }
    }

    function fillImages(elems) {

        for (var i = 0, length = elems.length; i < length; i++) {
            var elem = elems[0];
            var source = elem.getAttribute('data-src');
            if (source) {
                ImageStore.setImageInto(elem, source);
                elem.setAttribute("data-src", '');
            }
        }
    }

    function lazyChildren(elem) {

        unveilElements(elem.getElementsByClassName('lazy'), elem);
    }

    function lazyImage(elem, url) {

        elem.setAttribute('data-src', url);
        fillImages([elem]);
    }

    window.ImageLoader = {
        fillImages: fillImages,
        lazyImage: lazyImage,
        lazyChildren: lazyChildren
    };

})();

(function () {

    function setImageIntoElement(elem, url) {

        if (elem.tagName !== "IMG") {

            elem.style.backgroundImage = "url('" + url + "')";

        } else {
            elem.setAttribute("src", url);
        }

        if (browserInfo.chrome && !browserInfo.mobile) {
            if (!elem.classList.contains('noFade')) {
                fadeIn(elem, 1);
            }
        }
    }

    function fadeIn(elem, iterations) {

        var keyframes = [
          { opacity: '0', offset: 0 },
          { opacity: '1', offset: 1 }];
        var timing = { duration: 200, iterations: iterations };
        return elem.animate(keyframes, timing);
    }

    function simpleImageStore() {

        var self = this;

        self.setImageInto = setImageIntoElement;
    }

    window.ImageStore = new simpleImageStore();

})();