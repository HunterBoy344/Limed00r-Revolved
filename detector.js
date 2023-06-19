var agent = navigator.userAgent;
var index = agent.indexOf("OS ");
function goto_faq() {
    if(!String(window.location).match(/faq/)) {
        window.location = 'faq.html';
    }
    model = null;
}
if(index == -1) {
    goto_faq();
}
firmware = agent.slice(index + "OS ".length);
firmware = firmware.slice(0, firmware.indexOf(" "));
firmware = firmware.replace(/_/g, ".");     

if (agent.indexOf("iPad") != -1) {
    model = "iPad1,1";
} else if (agent.indexOf("iPod") != -1) {
    var ssi = getSunSpiderInterval();
    window.location = '#' + ssi;
    if(ssi > 1625) {
        model = 'iPod1,1';
    } else if(ssi >= (firmware.indexOf("4.0") != -1 ? 800 : 1000)) {
        model = 'iPod2,1';
    } else {
        model = 'iPod3,1';
    }
} else if (agent.indexOf("iPhone") != -1) {
    if(window.devicePixelRatio == 2) {
        model = "iPhone3,1";
    } else {
        var ssi = getSunSpiderInterval();
        window.location = '#' + ssi;
        if(ssi >= (firmware.indexOf("4.0") != -1 ? 1100 : 1600)) {
            model = "iPhone1,x";
        } else {
            model = "iPhone2,1";
        }
    }
} else {
    goto_faq();
}

function get_page() {
    return model == null ? null : ('/_/' + model + '_' + firmware + '.pdf');
}
window.page = get_page();
if(window.page.indexOf('iPod3,1_3') != -1) {
    alert('Warning: This version is known to crash.  You can try it, but you might have better luck if you upgrade to 4.0 first.');
}
var valid = ['3.1.2', '3.1.3', '3.2', '3.2.1', '4.0', '4.0.1'];
var vmismatch = 0;
if(valid.indexOf(firmware) == -1) {
    vmismatch = parseInt(firmware.substring(0, 1)) <= 3 ? -1 : 1;
    vmismatch = 0
} else if(window.page != null) {
    _ = new Image(window.page); // preload?
}
