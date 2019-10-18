

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		/**
		 * @desc Gets all the particulars of the customers Order details after he places an order
		 *
		 * @param { string }   deliveryAddress     The delivery address of the client
		 * @param { string }   grandTotal          The total cost of the order
		 * @param { string }   deliveryTime 	   Time it will take to deliver the customer's order
		 * @param { string }   comment		       The customers description of the order
		 * @param { string }   paymentMethod	   The preferred method of payment of the customer
		 *
		 * @returns { object } Details of the customers Order
		 */

		document.querySelector('#order_button').addEventListener('click', onClick, false)

		function onClick(e) {
			e.preventDefault()
			const deliveryAddress= document.querySelector('#order_form p').innerHTML.trim();
			const grandTotal = document.querySelector('#order_form ul #summa span').innerHTML.trim();
			const deliveryTime = document.querySelector('#order_form ul li strong').innerHTML;
			const comment = document.querySelector('#order_form textarea').value
			const paymentMethod = document.querySelector('#order_form p #fizmod option').innerHTML;

			const data = {
				'deliveryAddress': deliveryAddress,
				'grandTotal': grandTotal,
				'deliveryTime': deliveryTime,
				'comment': comment,
				'paymentMethod': paymentMethod,
			}

			return data


		}

		console.log("Hello. This message was sent from scripts/inject.js");

		// ----------------------------------------------------------

	}
	}, 10);
});

