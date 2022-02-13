






- https://stackoverflow.com/questions/15748656/javascript-reduce-on-object
- 

```js
const [storageList, setStorageList] = useState([]);

  useEffect(()=>{

    Object.keys(localStorage).reduce(function(obj, str) { 
      console.log(str)
      //obj[str] = localStorage.getItem(str);
      setStorageList(item=>[...item,str])//add item
      return obj
    }, {});
  },[])
```

```js
return Object.keys(pair).reduce(function(obj, str) { 
  console.log(str)
  console.log(pair[str])
  let add = <tr key={str}><td> <label> {str} </label> <input value={pair[str]} readOnly /> </td></tr>
  return [...obj,add] //add array
}, []); //<- this is important for array type [], this {} will not work

```