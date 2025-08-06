
const boton = document.getElementById("action");

boton.addEventListener("click", () => {
  xpathToExecute = "//div[contains(@class,'e9j91380')]//p/text()"
  xpathToExecute2 = "//div[contains(@class,'e9j91380')]//a/@href"
  var prueba2 = function(xpathToExecute){
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
      result.push( nodesSnapshot.snapshotItem(i) );
    }
  return result;
  }
  
  var prueba3 = function(xpathToExecute2){
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
      result.push( nodesSnapshot.snapshotItem(i) );
    }
  return result;
  } 
  Remitentes=[]
  Mensajes= []
  prueba2.forEach(x => Mensajes.push(x.nodeValue.replaceAll('\n'," ")))
  prueba3.forEach(x => Remitentes.push(x.nodeValue.replaceAll('\n'," ")))

  //Remitente= [Remitente.join("|")]
  //Mensajes = [Mensajes.join("|")]
  const arrayOfObjects = [];
  for (let i = 0; i < Mensajes.length; i++) {
    const obj = {};
    obj.key = Remitentes[i]; // Assign the key from the first array
    obj.value = Mensajes[i]; // Assign the value from the second array
    arrayOfObjects.push(obj);
  }

  Mensajes = Mensajes.map(item => ({Mensaje:item}))
  Remitentes = Remitentes.map(item => ({Remitente:item}))


  const csvString1 = [
      [
        "Remitente","Mensaje"
        
      ],
      
        ...arrayOfObjects.map(item => [
        item.key,
        item.value
      ]
  )
    ]
    .map(e => e.join("|")) 
    .join("\n");




  let blob = new Blob([csvString1], { type: "text/plain;charset=utf-8" })
  let url = URL.createObjectURL(blob)
  let downloadLink = document.createElement('a')
  downloadLink.download = '78.1.19.txt'
  downloadLink.href = url
  downloadLink.click() 
})