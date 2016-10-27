var echo = (str, num) => {
    if (num == 0) return
    else {
        console.log(str)
        echo(str,num-1)
    }
}

echo("Echo!!!", 10)
echo("Tater Tots", 3)