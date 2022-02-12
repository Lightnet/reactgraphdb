






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