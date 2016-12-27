var app = angular.module('myApp', []);

app.directive('sidebarOpen', [function() {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {

			scope.flag = true;
			scope.element = iElement[0];
			scope.body = document.body;

			//control body
			function controlBody() {
				if (scope.flag) {
					scope.body.style.overflowY = "hidden";
				} else {
					scope.body.style.overflowY = "auto";
				}

				scope.flag = !scope.flag;
			}

			scope.element.addEventListener("click", function() {
				var _element = document.getElementById(iAttrs.sidebarOpen);
				_element.classList.toggle("sidebar--is-open");

				var _bgSidebar = document.getElementById(iAttrs.sidebarOpen + "-bg");
				_bgSidebar.classList.toggle("sidebar-bg--is-visible");

				//control body
				controlBody();
			});

		}
	};
}]);

app.directive('sidebar', ['$compile', function($compile) {
	return {
		restrict: 'E',
		link: function (scope, iElement, iAttrs) {

			scope.body = document.body;
			scope.element = iElement[0];

			//renderize sidebar
			scope.element.style.display = "block";

			//add width on sidebar
			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}

			if (isNumber(iAttrs.size)) {
				scope.element.style.maxWidth = iAttrs.size + 'px';
			} else {
				scope.element.style.maxWidth = iAttrs.size;
			}

			//add class to position on sidebar
			scope.element.classList.add("sidebar--" + iAttrs.position);

			//renderize bg-sidebar
			var bgSidebar = document.createElement("div");
			bgSidebar.setAttribute("class", "sidebar-bg");
			bgSidebar.setAttribute("id", iAttrs.id + "-bg");
			bgSidebar.setAttribute("sidebar-open", iAttrs.id);
			scope.body.appendChild(bgSidebar);

			$compile(bgSidebar)(scope);

		}
	};
}]);