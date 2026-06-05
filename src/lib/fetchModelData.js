const base='https://rdrvd6-8081.csb.app'
async function fetchModel(url,option={}) {
  const res =await fetch(base+url,option)
  const data=await res.json()
  if(!res.ok){
    throw new Error(data.message || 'loi fetch')
  }
  return data
}
export default fetchModel
