export default (canvasList, opt) => {
    let ratio = window.devicePixelRatio || 1,
      ctx = null;
  
    canvasList.forEach(canvas => {
      ctx = canvas.getContext('2d');
      canvas.style.position = opt.position;
      canvas.style.width = opt.width + 'px';
      canvas.style.height = opt.height + 'px';
      canvas.width = opt.width * ratio;
      canvas.height = opt.height * ratio;
      ctx.scale(ratio, ratio);
    });
  
    return canvasList;
  };