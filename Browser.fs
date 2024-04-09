open Elmish
open Fable.Core
open System
open Feliz


module BasicTimer =

    type Model = { current: DateTime }

    type Msg = Tick of DateTime

    let init () = { current = DateTime.MinValue }, []

    let update msg model =
        match msg with
        | Tick current -> { model with current = current }, []

    let timer onTick =
        let start dispatch =
            let intervalId = JS.setInterval (fun _ -> dispatch (onTick DateTime.Now)) 1000

            { new IDisposable with
                member _.Dispose() = JS.clearInterval intervalId }

        start

    let subscribe model = [ [ "timer" ], timer Tick ]

    Program.mkProgram init update (fun model _ -> printf "%A\n" model)
    |> Program.withSubscription subscribe
    |> Program.run
