const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");
const reload = document.getElementById("reloadPage");
const printElement = document.getElementById("print");
const savePage = document.getElementById("savePage");
const shareContextMenuButton = document.getElementById("shareContextMenuButton");
const shareButton = document.getElementById("shareButton");

// The Ripple Animation for the Button

const buttons = document.getElementsByTagName("button");

function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Loop through all the buttons on the website and apply the ripple effect to each one
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

const normalizePozition = (mouseX, mouseY) => {
        // ? compute what is the mouse position relative to the container element (scope)
  let {
    left: scopeOffsetX,
    top: scopeOffsetY,
	} = scope.getBoundingClientRect();
        
  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;
       
  const scopeX = mouseX - scopeOffsetX;
  const scopeY = mouseY - scopeOffsetY;

        // ? check if the element will go out of bounds
  const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth;

  const outOfBoundsOnY =
  scopeY + contextMenu.clientHeight > scope.clientHeight;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

        // ? normalize on X
  if (outOfBoundsOnX) {
    normalizedX =
    scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
  }

        // ? normalize on Y
  if (outOfBoundsOnY) {
      normalizedY =
      scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
  }

    return { normalizedX, normalizedY };
};

scope.addEventListener("contextmenu", (event) => {
	event.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = event;

  const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

  contextMenu.classList.add("visible");

  contextMenu.style.top = `${normalizedY}px`;
  contextMenu.style.left = `${normalizedX}px`;

  // setTimeout(() => {
  //   contextMenu.classList.add("visible");
  // });
});

scope.addEventListener("click", (e) => {
      
    if (e.target.offsetParent != contextMenu) {
      contextMenu.classList.remove("visible");
    }
});


reload.addEventListener("click", (event) => {
	location.reload();
})

printElement.addEventListener("click", (event) => {
	window.print();
})

shareContextMenuButton.addEventListener("click", (event) => {
	navigator.share({
		title: document.title,
    text: "Check out this really cool project that @ValiantWind made!!1!111!!",
    url: window.location.href
	})
});

shareButton.addEventListener("click", (event) => {
	navigator.share({
		title: document.title,
    text: "Check out this really cool project that @ValiantWind made!!1!111!!",
    url: window.location.href
	})
});
