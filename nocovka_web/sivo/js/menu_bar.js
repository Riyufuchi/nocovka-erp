const hrefs = ["index.html", "../index.html#aboutme", "../index.html#what_i_do_id", "../index.html#contact-form", "../index.html#contact"];
const hrefTexts = ["Úvod", "O mě", "Co dělám", "Kontakt", "Sociální sítě"];
const htmlRootFolder = "sivoWeb/";

function createMenu()
{
	menuBar();
	footer();
}

function menuBar()
{
    let tbl = document.getElementById("sivoLinks");
    tbl.innerHTML = "";

    for (let i = 0; i < hrefs.length; i++)
    {
        const a = document.createElement("a");
        a.className = "sivoNavButton";
        a.href = i === 0 ? hrefs[i] : htmlRootFolder + hrefs[i];
        a.textContent = hrefTexts[i];
        a.onclick = closeMenu;

        tbl.appendChild(a);
    }
}
function isPhoneLandscape()
{
	return ((window.matchMedia("(orientation: landscape)").matches));
}
function closeMenu()
{
    if (!isPhoneLandscape())
	    document.getElementById("sivoLinks").style.display = "none";
    else
        document.getElementById("sivoLinks").style.display = "block";
}
function footer()
{
	document.getElementById("footer").innerHTML =
	'<a href="https://ko-fi.com/riyufuchi" target="blank"><img src="https://storage.ko-fi.com/cdn/logomarkLogo.png" alt="KoFi-logo" class="footerLogo"></a>' +
	'<a href="https://github.com/Riyufuchi" target="blank"><img src="pictures/logos/github-mark-white.svg" alt="github-logo" class="footerLogo"></a>';
}
