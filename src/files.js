/** Local-only downloads. ZIP uses the standard STORE format with CRC32. */
function escapeHTML(value) {return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function dataBytes(data){return Uint8Array.from(atob(data.split(',')[1]),c=>c.charCodeAt(0));}
function crc32(bytes){let crc=-1;for(const b of bytes){crc^=b;for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return(crc^-1)>>>0;}
function makeZip(files){
 const enc=new TextEncoder(),chunks=[],central=[];let offset=0;
 const u16=(v,n,x)=>v.setUint16(n,x,true),u32=(v,n,x)=>v.setUint32(n,x,true);
 for(const file of files){const name=enc.encode(file.name),data=typeof file.data==='string'?enc.encode(file.data):file.data,crc=crc32(data);const h=new Uint8Array(30+name.length),v=new DataView(h.buffer);u32(v,0,0x04034b50);u16(v,4,20);u16(v,6,0x800);u16(v,8,0);u16(v,12,0x0021);u32(v,14,crc);u32(v,18,data.length);u32(v,22,data.length);u16(v,26,name.length);h.set(name,30);chunks.push(h,data);
 const c=new Uint8Array(46+name.length),w=new DataView(c.buffer);u32(w,0,0x02014b50);u16(w,4,20);u16(w,6,20);u16(w,8,0x800);u16(w,14,0x0021);u32(w,16,crc);u32(w,20,data.length);u32(w,24,data.length);u16(w,28,name.length);u32(w,42,offset);c.set(name,46);central.push(c);offset+=h.length+data.length;}
 const length=central.reduce((sum,a)=>sum+a.length,0),end=new Uint8Array(22),v=new DataView(end.buffer);u32(v,0,0x06054b50);u16(v,8,files.length);u16(v,10,files.length);u32(v,12,length);u32(v,16,offset);return new Blob([...chunks,...central,end],{type:'application/zip'});
}
