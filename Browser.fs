open Browser

let mutable count = 0

let div = document.createElement "div"
div.innerHTML <- "<div>" + count.ToString() + "</div>"

div.innerHTML <- div.innerHTML + $"<button onclick=\"{fun _ -> count + 1}\">click</button>"

document.body.appendChild div |> ignore
