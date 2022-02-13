





- https://gun.eco/docs/API#-a-name-on-a-gun-on-callback-option-
```js
// add listener to status
gun.get('status').on((ack)=>{
    console.log(ack);
    console.log(ack.online);
});

// remove listener to status
gun.get('status').off()
```

```js
gunp.get('status').put({online:'on'}) //bad // docs say it trigger twice
gunp.get('status').put({online:'off'}) //bad

gunp.get('status').get('online').put('on')//good //droc say it trigger once
gunp.get('status').get('online').put('off')//good

```

