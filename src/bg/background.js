
/**
*Message handler that displays the message showing that the cart information has been successfully added
*/

chrome.runtime.onMessage.addListener(function(request){
    if( request == 'Order Added to Extension') {
        alert(request)
    }
    }
)