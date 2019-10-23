import {assert, expect} from 'chai';
import chrome from 'sinon-chrome/extensions';



const url = `https://pizzaforte.hu/penztar.php/`;


describe( 'Testing the chrome extension', () => {


    it("should call the windows.create chrome function when the page loads ", () => {
        assert.ok(chrome.windows.create.notCalled);
        chrome.windows.create({url, active: true});
        assert.ok(chrome.windows.create.calledOnce);

    });

    it('should show call the onMessage chrome runtime function on page load ', () =>{
        chrome.windows.create({url:url, active: true});
        expect(chrome.runtime.onMessage._listeners).to.be.an('array')
    });

});
