
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading

			const allButtons = document.getElementsByClassName('pizza_size_button');
			const saladButton = document.getElementsByClassName('salad_price_button');
			const priceButton = document.getElementsByClassName('price_button');
			const drinkButton = document.getElementsByClassName('drink_size_button');
			function addListenersToButton(buttons) {
				for(let i=0; i<buttons.length; i++) {
					(function (index) {
						buttons[index].addEventListener("click", onButtonClick)
					})(i);
				}
			}

			addListenersToButton(allButtons);
			addListenersToButton(saladButton);
			addListenersToButton(priceButton);
			addListenersToButton(drinkButton);

			async function onButtonClick() {
				let promise = new Promise((res, rej) =>{
					setTimeout(function firstAsync() {
						if(document.querySelector('#orders_sticker_list_container')) {
							const orders = document.querySelector('#orders_sticker_list_container');
							const names = document.querySelector('#orders_sticker_list_container #orders_sticker_list_content .orders_sticker_list tbody tr').innerHTML;
							const newArray = Array.from(orders);
							const formatOrders = newArray.shift();
							console.log(names);
							// console.log(newArray[0].outerHTML,'the shifter array')
						}
					}, 3000);

				})
				await promise;


			}



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

			if(document.querySelector('#order_button')){
				document.querySelector('#order_button').addEventListener('click', onClick, false);

				function onClick(e) {
					e.preventDefault();
					const deliveryAddress = document.querySelector('#order_form p').innerHTML.trim();
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
			}

			console.log("Hello. This message was sent from scripts/inject.js");

			// ----------------------------------------------------------

		}
	}, 10);
});

console.log('Loaded');
