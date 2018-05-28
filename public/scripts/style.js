$(window).resize(function () {
    //    refreshModal();
    //    refreshModal();
    windowResize();
});

$(document).ready(function () {
    windowResize();
    $('#submit_button').click(function (event) {
        event.preventDefault();
        $.ajax({
            url  : '/upload',
            type : 'post',
            dataType: 'html',
            data : $("#upload_form").find("form").serialize(),
            success: function (data) {
                alert('Email Sent');
            }
        });
    });
});

function windowResize() {
    if ($(window).width() < 1480) {
        for (var i = 1; i < 9; ++i) {
            setModal(i);
            $(`.ui.circular.icon.button#${i}`).popup(false);
        }
    }
    else {
        for (var i = 1; i < 9; ++i) {
            $(`.ui.circular.icon.button#${i}`).off('click.modal');
            setPopup(i);
        }
    }
}

function setModal(id) {
    $(`.ui.circular.icon.button#${id}`).on('click.modal', function () {
        $(`.ui.modal#modal_${id}`).modal('show');
    });
}

function setPopup(id) {
    $(`.ui.circular.icon.button#${id}`).popup({
        on: 'click',
        //       position: 'bottom left',
        lastResort: 'left bottom',
        target: `#image${id}`,
        popup: $(`.ui.custom.popup.top.left.transition.hidden#pop_${id}`)
    });
}
$(document).ready(function () {
    $(".ani-img").hide();
    $(".heart").hide();
    $("#downbeard").hide();
    $("#upbeard").hide();
    $(".star").hide();
    $("#hat").hide();
    $("#bubble").hide();
    $(".ani-img").mouseleave(function () {
        $("#glenimg").show();
        $("#kennyimg").show();
        $("#hanimg").show();
        $("#chiaimg").show();
        $("#andyimg").show();
        $("#lewisimg").show();
        $("#lisaimg").show();
        $(".heart").stop(true, true);
        $("#downbeard").stop(true, true);
        $(".ani-img").hide();
        $(".heart").hide();
        $("#downbeard").hide();
        $("#upbeard").hide();
        $(".star").hide();
        $("#hat").hide();
        $("#bubble").hide();
    });
    $("#glenimg").mouseenter(function () {
        $("#glenimg").hide();
        $("#heartglen").show();
        $(".heart").stop(true, true);
        $("#left-heart1").transition('flash');
        $("#left-heart2").transition('flash');
        $("#left-heart3").transition('flash');
        $("#right-heart1").transition('flash');
        $("#right-heart2").transition('flash');
        $("#right-heart3").transition('flash');
        $(".heart").stop(true, true);
    });
    $("#heartglen").mouseleave(function () {
        $(".heart").stop(true, true);
        $(".heart").hide();
        $("#heartglen").hide();
        $("#glenimg").show();
    })
    $("#kennyimg").mouseenter(function () {
        $("#kennyimg").hide();
        $("#kennyani").show();
        $("#downbeard").show();
        $("#downbeard").transition('tada');
    })
    $("#kennyani").mouseleave(function () {
        $("#kennyimg").show();
        $("#kennyani").hide();
        $("#downbeard").stop(true, true);
        $("#downbeard").hide();
    })
    $("#hanimg").mouseenter(function () {
        $("#hanimg").hide();
        $("#hanani").show();
        $(".star").show();
        $(".star").transition('jiggle');
    })
    $("#hanani").mouseleave(function () {
        $("#hanani").hide();
        $("#hanimg").show();
        $(".star").hide();
    })
    $("#chiaimg").mouseenter(function () {
        $("#chiaimg").hide();
        $("#chiaani").show();
        $("#hat").show();
        $("#hat").transition('bounce');
    })
    $("#chiaani").mouseleave(function () {
        $("#chiaimg").show();
        $("#chiaani").hide();
        $("#hat").stop();
        $("#hat").hide();
    })
    $("#andyimg").mouseenter(function () {
        $("#andyimg").hide();
        $("#andyani").show();
        $("#block").show();
        $("#block").animate({ height: 'toggle' });
    })
    $("#andyani").mouseleave(function () {
        $("#andyimg").show();
        $("#andyani").hide();
        $("#block").hide();
    })
    $("#lewisimg").mouseenter(function () {
        $("#lewisimg").hide();
        $("#lewisani").show();
        $("#bubble").transition('fade right');
    })
    $("#lewisani").mouseleave(function () {
        $("#lewisimg").show();
        $("#lewisani").hide();
        $("#bubble").transition('fade right');
    })
    $("#lisaimg").mouseenter(function () {
        $("#lisaimg").hide();
        $("#lisaani").show();
        $("#lip").show(); $("#lip").animate({ width: '100%', height: '100%', left: -120, top: -130, opacity: 0.01 }, "slow");
        $("#lip").animate({ width: '7%', height: '7%', left: 0, top: 0, opacity: 1 }, 0.000001);
    })
    $("#lisaani").mouseleave(function () {
        $("#lisaimg").show();
        $("#lisaani").hide();
        $("#lip").hide();
    })
});    
