describe('inject', function () {
    it('should load successfully'){
        const allButtons = document.getElementsByClassName('pizza_size_button');

        expect(allButtons).to.eql(null)
    }
    
});