
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

			/**
			 * @function addListenersToButton Checks which button has been clicked when a user adds an item to the cart
			 */
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


			/**
			 * @function onButtonClick Captures items added to the cart and sends a message to background.js
			 * confirming that the items have been added
			 */
			async function onButtonClick() {
				let promise = new Promise(() =>{
					setTimeout(function firstAsync() {
						if(document.querySelector('#orders_sticker_list_container')) {
							const newOrders = document.querySelector('#orders_sticker_list_container').innerHTML;
							const orderName = document.querySelectorAll('#orders_sticker_list_container ' +
								'#orders_sticker_list_content ' +
								'.orders_sticker_list tbody ');

							for(let newName of orderName) {
								for (let i = 0; i < newName.rows.length; i++) {
									let thirdCol = newName.rows[i].cells[2].innerText;

									let fourthCol = newName.rows[i].cells[3].innerText;
									let fifthCol = newName.rows[i].cells[4].innerText;
									console.log({'item Name':thirdCol, 'item QTY': fourthCol, 'item Price':fifthCol})
								}
							}
							// console.log(newOrders)
							chrome.runtime.sendMessage( "Order Added to Extension", function() {
								console.log('message sent');
							});
						}
					}, 3000);

				})
				await promise;


			}




			if(document.querySelector('#order_button')){
				document.querySelector('#order_button').addEventListener('click', onClick, false);

				/**
				 * @function onClick Gets all the particulars of the customers Order details after he places an order
				 *
				 * @returns { object } Details of the customers Order
				 */
				function onClick(e) {
					e.preventDefault();

					/**
					 * @constants
					 * @type { string }   deliveryAddress       The delivery address of the client
					 * @type { string }   grandTotal            The total cost of the order
					 * @type { string }   deliveryTime 	   	    Time it will take to deliver the customer's order
					 * @type { string }   comment		        The customers description of the order
					 * @type { string }   paymentMethod	   		The preferred method of payment of the customer
					 * @type { object }   data					Stores the values from the cart
					 */
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
					console.log (data)
					chrome.runtime.sendMessage( "Order Completed", function() {
						console.log('Completed');
					});



				}
			}

			console.log("Hello. This message was sent from scripts/inject.js");

			// ----------------------------------------------------------

		}
	}, 10);
});


