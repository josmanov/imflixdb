function filter_function()
{
    const search_input = document.getElementById("my_input");
    const search_word = search_input.value.toUpperCase();
    const dropdown_menu = document.getElementById("my_dropdown");
    const genre_links = dropdown_menu.getElementsByTagName("a");
    for (let i = 0; i < genre_links.length; i++)
    {
        let genre_text = genre_links[i].textContent || genre_links[i].innerText;
        if (genre_text.toUpperCase().indexOf(search_word) > -1)
        {
            genre_links[i].style.display = "";
        }
        else
        {
            genre_links[i].style.display = "none";
        }
    }
}