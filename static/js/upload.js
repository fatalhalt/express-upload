$(function () {
    status('choose a file');
    var timerId;

    function setTimer() {
        timerId = setInterval(function () {
            if ($('#userFileInput').val() !== '') {
                clearInterval(timerId);
                $('#uploadForm').submit();
            }
        }, 500);
    }

    function setProgress(percent) {
        $('#percent').html(percent + '%');
        $('#bar').css('width', percent + '%');
    }

    setTimer();
    $('#uploadForm').submit(function () {
        status('0%');
        var formData = new FormData();
        var file = document.getElementById('userFileInput').files[0];
        formData.append('userFile', file);
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('post', '/api/upload', true);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable)
                setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onerror = function (e) {
            status('error while trying to upload');
        };
        xhr.onload = function () {
            $('#userFileInput').val('');
            setProgress(0);
            var resJson = JSON.parse(xhr.responseText);
            status(resJson.file + ' done, choose a file');
            setTimer();
            if (resJson.image)
                window.open('./uploads/' + resJson.savedAs, 'upload', 'status=1, height = 300, width = 300, resizable = 0');
            else
                console.log('not an image');
        };
        xhr.send(formData);
        return false; // no refresh
    });
    function status(message) {
        $('#status').text(message);
    }

    function uploadedFilenameList() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/api/filenames', true);
        xhr.onload = function () {
            var fnames = JSON.parse(xhr.response);
            fnames.forEach(function (element) {
                $("#filenames").append("<a href=\"./uploads/" + element + "\" style=\"display: block\">" + element + "</a>");
            });
        }
        xhr.send();
    }
    uploadedFilenameList();

    var matrixRain = function() {
        var c = document.getElementById("c");
        c.height = window.innerHeight;
        c.width = window.innerWidth;

        var drop_size = 12;
        var columns = c.width / drop_size;

        var chinese = "ムタ二コク1234567890シモラキリエスハヌトユABCDEF";
        chinese = chinese.split("");

        var drops = [];
        for (var i = 0; i < columns; i++)
            drops[i] = 1; //y coordinate - same for everyone at the starting. The index contains the x coordinate

        ctx = c.getContext('2d');

        function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.fillStyle = "#0f0";
            ctx.font = drop_size + "px arial";
            for (var i = 0; i < drops.length; i++) {
                text = chinese[Math.floor(Math.random() * chinese.length)];
                ctx.fillText(text, i * drop_size, drops[i] * drop_size);

                if (drops[i] * drop_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;

                drops[i]++;
            }

        }
        setInterval(draw, 100);
    }
    matrixRain();
});


