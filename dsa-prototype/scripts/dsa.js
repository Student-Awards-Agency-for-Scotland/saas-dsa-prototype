/**Trusted types policy - not supported on all browsers */
let sanitize = null;
if (window.trustedTypes && trustedTypes.createPolicy) {
	console.log("Trusted types")
	sanitize = trustedTypes.createPolicy('default', {
		// Checking the SVG in the text or not to see the images in the find stiudent date picker. Some how th esanetizer removing the svg from the html.
		// DOMPurify.sanitize('<svg class="ds_icon" aria-hidden="true" role="img"><use href="/assets/images/icons/icons.stack.svg#calendar_today"></use></svg>'); this will be returning '<svg role="img" aria-hidden="true" class="ds_icon"></svg>'
		// to avoid this I'm excluding the saniti if it has a use tag in it.  https://github.com/cure53/DOMPurify
		createHTML: string => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true, ADD_TAGS: ['use'] }),
		createScriptURL(string) {
			let u = new URL(string, document.baseURI);
			if (u.origin == window.origin) {
				return u.href;
			}
			throw new Error('Only same-origin scripts, please');
		},
	});
}
		
/**
 * The strict-dynamic keyword in WebSecurityConfig csp allows us to propagate trust to all scripts that are 
 * loaded by a script that we already trust with either hashes or nonces.
 */
function dynamicallyLoadScript(type, url) {
	let script = document.createElement('script')
	/** Sanitize the url */
	let sanitizedURL = sanitize.createScriptURL(url)
	script.src = sanitizedURL
	script.type = type

	document.head.appendChild(script)
	console.log("dynamicallyLoadScript is :" + script.src)
}

dynamicallyLoadScript('text/javascript', '/saas-dsa-prototype/dsa-prototype/scripts/jquery-3.6.1.min.js')
dynamicallyLoadScript('module', '/saas-dsa-prototype/dsa-prototype/scripts/purify.min.js')

/**Check jQuery is loaded for the following scripts*/
window.onload = function() {

	if (window.jQuery) {
		console.log("jQuery loaded")
	}
	if (window.DS) {
		window.DS.initAll();
		console.log("DS initialised");
	}
	if (document.getElementById('error-summary')) {
		$("#error-summary").focus();
	}

}

