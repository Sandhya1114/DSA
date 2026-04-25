function customRender(reactEle,container){

/**
 * 
    const domEle=document.createElement(reactEle.type)
    domEle.innerHTML=reactEle.children
     domElement.setAttribute('href',reactEle.props.href)
     domEle.innerHTML=reactEle.children
     domElement.setAttribute('href',reactEle.props.target)
 */



const domEle=document.createElement(reactEle.type)
domEle.innerHTML=reactEle.children
for (const prop in reactEle.props) {
    if(prop=='children') continue;
    domElement.setAttribute(prop,reactEle.props[prop])
}
container.appendChild(domEle)
}




const reactEle={
    type:'a',
    props:{
        href:'https://google.com',
        target:'_blank'
    },
    children:'Click me to visit google'
}




const mainConatainer=document.querySelector('#root')
customRender(reactEle,mainConatainer)
