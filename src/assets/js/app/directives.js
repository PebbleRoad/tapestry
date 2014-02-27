/**
 * Tapestry Directives
 */

angular.module('tapestry.directives', [])
		
	.directive('compile', ['$compile', function ($compile) {
			return function(scope, element, attrs) {
					scope.$watch(
						function(scope) {
							return scope.$eval(attrs.compile);
						},
						function(value) {

							var v = value? marked(value): value;
							
							element.html(v);
							
							$compile(element.contents())(scope);
						}
					);
			}
		}])
	.directive('previewAndMarkup', function(){

		return {

			restrict: 'A',
			scope: {
				patterns: '='
			}, 
			template: '<div once-wait-for="patterns" once-show="patterns.path" class="block block--example"> \
							<div class="block block--preview"><div raw-include="raw-include" patterns="patterns" src="patterns.path"></div></div> \
							<div class="block block--description"> \
								<div class="patterns-description"></div> \
							</div> \
							<div once-wait-for="patterns" once-hide="patterns.meta.hidecode" class="example-code"> \
								<a class="toggle-code" ng-hide="patterns.meta.hidecode" ng-class="{active:patterns.togglecode}" ng-click="patterns.togglecode = !patterns.togglecode"><em class="fa fa-code fa-lg" /></a> \
								<pre ng-show="patterns.togglecode"><code class="language-markup"></code></pre> \
							</div> \
						</div>'

		}
	})
	.directive('rawInclude', [
		 '$http', '$templateCache', '$compile', '$q', '$timeout',
		 	function ($http, $templateCache, $compile, $q, $timeout) {

		 		var totalcount = 0		 			

				return {
					restrict: 'A',
					terminal: true,
					scope: {
						patterns: '='
					},
					compile: function (telement, attr) {

						var srcExp = attr.src, count = 0;

						return function (scope, element) {

							scope.$watch(scope.patterns, function(){
								if(scope.patterns && scope.patterns.children) totalcount = scope.patterns.children.length
							})
							
							var changeCounter = 0
														

							scope.$watch(srcExp, function (src) {

								var thisChangeId = ++changeCounter;								

								if (src) {

									// requests.push($http.get(src))

									$http.get(src, { cache: $templateCache }).success(function (response) {
										
										if (thisChangeId !== changeCounter) return;

										/* Increment counter */
										
										count++;

										/**
										 * Parsing Markdown files
										 * @type {Object}
										 */
										
										var parsedContent = {                    
						                    yaml: '',
						                    markdown: '', 
						                    html: '',
						                    meta: {}
						                };

						                /* Split newlines */

						                var lines = response.split('\n')

						                var frontMatter = '';
						                
						                /* Get to the end of --- */

						                //if(lines[0]=="") lines.splice(0,1)
						                
						                

						                if (lines[0].trim() === '---') {
						                    var firstFrontMatterMarker = lines.shift();
						                    var line = '';
						                    while (line !== '---') {
						                        frontMatter = frontMatter + line + "\n"; 
						                        line = lines.shift();
						                    }
						                }

						                /* YAML content */

						                parsedContent.yaml = frontMatter;

						                /* YAML parsed content */

						                parsedContent.meta = jsyaml.load(frontMatter);

						                /* HTML content */

						                parsedContent.html = lines.join('\n');


						                /* Add description */

						                var $description = element.parent().next();

						                if(parsedContent.meta && parsedContent.meta.description){
						                	
						                	parsedContent.markdown = marked(parsedContent.meta.description);					
						                	
						                	$description.html(parsedContent.markdown)

						                }else{
						                	
						                	/* If there is no description: Hide it */

						                	$description.hide()
						                }
						                

										/* Element preview */

										element.html(parsedContent.html)

										/* Trigger element added */
										
										if(count == totalcount) {
											$timeout(function(){

												angular.element('body').trigger('tapestry.completed')	
											},500)
											
											
										}


										/* Element Syntax highlight */

										var code = element.closest('.block--example').find('code'),
												$element = element.clone();
										
										/* Adds codes to the code block */

										code.text(parsedContent.html);

										/* Highlighting */
										
										Prism.highlightElement(code[0]);


									}).error(function () {
											
										if (thisChangeId === changeCounter) element.html('');

									});
								}
						
								else element.html('');
					
							});

														
						};



						
					 },

					 link: function(scope, element, attrs){
						
						if(scope.$last){
							console.log("hey")	
						}

					 }
				};
		 }])
	
	.directive('tapestryVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
		  elm.text(version);
		};
	}])
	.directive('lastUpdated', ['lastUpdated', function(version) {
		return function(scope, elm, attrs) {
		  elm.text(version);
		};
	}])
;