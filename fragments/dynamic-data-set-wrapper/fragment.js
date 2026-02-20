const observer = new MutationObserver((mutationsList) => {
	
	fragmentElement.querySelectorAll("tbody>tr").forEach(item => {
		item.addEventListener("click", (e) => {
			Liferay.fire("selectedClassPK", {"classPK": e.target.getAttribute("data-id").split(":")[0].split(",")[1]});
		});
	});	
	
});

observer.observe(fragmentElement, {
  childList: true,
  subtree: true
});

