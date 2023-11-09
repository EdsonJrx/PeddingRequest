export function getInicials(nomeCompleto:string) {
    const palavras = nomeCompleto.split('.');
    let iniciais = '';
  
    for (const palavra of palavras) {
      if (palavra.length > 0) {
        iniciais += palavra[0].toUpperCase();
      }
    }
    return iniciais;
  }