/**
 * Created by sukumar on 6/2/2017.
 */
window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
};
window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
};
window.wrapperEventListener = function (element, ev, callback) {
    if (typeof element == 'string') {
        element = window.qs(element);
    }
    if (!element) {
        return;
    }
    element.addEventListener(ev, callback)
};
window.delegateEvent = function (parent, target, event, callback) {
    var eventDispatcher = function (e) {
        var currTarget = e.target;
        var allMatches = window.qsa(target, parent);
        var hasTarget = Array.prototype.indexOf.call(allMatches, currTarget) > -1;
        if (hasTarget) {
            callback.call(currTarget, e);
        }
    }

    window.wrapperEventListener(parent, event, eventDispatcher);
};
window.parent = function (element, parentTag) {
    if (!element.parentNode) {
        return;
    }
    if (element.parentNode.tagName.toLowerCase() === parentTag.toLowerCase()) {
        return element.parentNode;
    } else {
        return window.parent(element.parentNode, parentTag);
    }
}