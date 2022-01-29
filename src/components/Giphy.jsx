import React from 'react';

export default function Giphy({ items }) {
  //   console.log(items[0].url);
  return (
    <div class='grid-container'>
      {items &&
        items.map((item, index) => (
          <div class='grid-item' key={item.id}>
            {/** Gif will not display but successfully it is getting data from API  */}
            <img src={item.url} height='300px' width='300px' alt={item.id} />
          </div>
        ))}
    </div>
  );
}
