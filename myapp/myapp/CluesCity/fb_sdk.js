var responseData='aa';

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '177842309598524',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.0'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.0&appId=177842309598524';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  
 function statusChangeCallback(response){
   if( response.status === 'connected' ){
     console.log( 'Logged in and authenticated' );
     setElements(true);
     getProfile();
   } else {
    console.log( 'Not authenticated' );
    setElements(false);
   }
 }


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function setElements(isLogin){
  if(isLogin){
    document.getElementById('fb-btn').style.display = 'none';
    document.getElementById('start').style.display = 'block';
  }else{
    document.getElementById('fb-btn').style.display = 'block';
    document.getElementById('start').style.display = 'none';
  }
}
/*
function logout(){
  FB.logout(function(response){
    setElements(false);
  });
}
*/
function getProfile(){
  FB.api('/me?fields=name,email',function(response){
    if(response && !response.error){
      console.log(response);
      responseData = response ;
    }    
     PassToMain(responseData);
  })
}


function PassToMain(responseData)
{
    $.ajax({
        type: 'post',
        url: './login/user',
        data:responseData
    });
}

