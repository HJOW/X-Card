// 새 서식 파일에 대한 소개는 다음 문서를 참조하세요.
// http://go.microsoft.com/fwlink/?LinkID=397704
// Cordova Simulate의 페이지 로드 또는 Android 장치/에뮬레이터에서 코드를 디버그하려면 앱을 실행하고 중단점을 설정하세요.
// 그런 다음 JavaScript 콘솔에서 "window.location.reload()"를 실행합니다.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Cordova 일시 중지를 처리하고 이벤트를 다시 시작합니다.
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova가 로드되었습니다. 여기서 Cordova가 필요한 모든 설치를 수행합니다.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        execXCard();
    };

    function onPause() {
        // TODO: 이 응용 프로그램이 일시 중지되었습니다. 여기서 응용 프로그램 상태를 저장합니다.

        execXCard();
    };

    function onResume() {
        // TODO: 이 응용 프로그램이 다시 활성화되었습니다. 여기서 응용 프로그램 상태를 복원합니다.

        execXCard();
    };

    function execXCard() {
        try { screen.orientation.lock('landscape'); } catch (e) { }
        location.href = "./xcard/xcard.html";
    };
} )();