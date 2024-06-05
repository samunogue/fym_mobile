export function formatarData(data){
    const dataObj = new Date(data);
      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então adicionamos 1.
      const ano = dataObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }