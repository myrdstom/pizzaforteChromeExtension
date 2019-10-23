import {assert, expect} from 'chai';
import chrome from 'sinon-chrome/extensions';



const url = `https://pizzaforte.hu/penztar.php/`;


describe( 'Testing the chrome extension', () => {
    it("should render Main component", () => {
        assert.ok(chrome.windows.create.notCalled);
        chrome.windows.create({url:url, active: true});
        assert.ok(chrome.windows.create.calledOnce);
    });

    it('should show an alert in the right circumstances', () =>{
        chrome.windows.create({url:url, active: true});
        expect(chrome.runtime.onMessage._listeners).to.be.an('array')
    });

});
