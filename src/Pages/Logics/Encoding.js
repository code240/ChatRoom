const Encoding = (x) => {
    let encoding  = "";
    
   
    
    const myChar = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
        'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1',
        '2', '3', '4', '5', '6', '7', '8', '9', '*',
        '+', '-', '_', '@', '#', '&', '%'
      ];
      
    
    
    
    const encodes = [
        'GOTV', 'TZX9', 'G62Y', 'XM1R', 'YIAK', 'DPLU',
        'I9NM', '2XIZ', 'XENU', 'N75D', 'YXFT', 'C9S1',
        'ZORB', 'NYDF', 'P2SF', 'VV6U', 'CBRF', '05U7',
        'OLY7', '2IR2', 'FFT2', 'GDG4', 'F960', 'GKY8',
        '7IAP', 'HV9T', '08QA', '8D8E', '33DW', '4G4M',
        'EKZJ', '184V', '64PF', 'OEBK', '36W2', 'ZARK',
        '0PFO', '1CY8', 'GRB1', 'I3KR', 'D7H2', 'PUYK',
        'JKWM', 'QG10', 'O8WW', 'QVFH', 'DS0D', 'P6Y9',
        'AZ24', '8219', 'T1OZ', '3QE9', '3BY2', '5T53',
        'MGKI', 'D6MG', '4QP5', 'JI5N', 'IHAZ', 'EMFG',
        'XW4Q', 'AB1W', 'PY0C', '02QG', 'PKWL', 'N0ZE',
        'TP2Z', 'QIGV', '5LG6', 'MFP9'
      ];
    
    for(let i = 0; i < x.length; i++){
        let indexNumber = myChar.indexOf(x[i]);
        encoding += encodes[indexNumber];
    }
    return encoding;    
}

// Decoding
const Decoding = (x) => {
    let decoding  = "";
    
    if(x===undefined){
      return undefined;
    }
   
    
    const myChar = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
        'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1',
        '2', '3', '4', '5', '6', '7', '8', '9', '*',
        '+', '-', '_', '@', '#', '&', '%'
      ];
      
    
    
    
    const encodes = [
        'GOTV', 'TZX9', 'G62Y', 'XM1R', 'YIAK', 'DPLU',
        'I9NM', '2XIZ', 'XENU', 'N75D', 'YXFT', 'C9S1',
        'ZORB', 'NYDF', 'P2SF', 'VV6U', 'CBRF', '05U7',
        'OLY7', '2IR2', 'FFT2', 'GDG4', 'F960', 'GKY8',
        '7IAP', 'HV9T', '08QA', '8D8E', '33DW', '4G4M',
        'EKZJ', '184V', '64PF', 'OEBK', '36W2', 'ZARK',
        '0PFO', '1CY8', 'GRB1', 'I3KR', 'D7H2', 'PUYK',
        'JKWM', 'QG10', 'O8WW', 'QVFH', 'DS0D', 'P6Y9',
        'AZ24', '8219', 'T1OZ', '3QE9', '3BY2', '5T53',
        'MGKI', 'D6MG', '4QP5', 'JI5N', 'IHAZ', 'EMFG',
        'XW4Q', 'AB1W', 'PY0C', '02QG', 'PKWL', 'N0ZE',
        'TP2Z', 'QIGV', '5LG6', 'MFP9'
      ];
    
  
    if(x.length%4 !== 0){
        console.log("error : " + x);
        return false;
    }

    for(let i = 0; i < x.length; i = i + 4){
        let firstEncode = x[i]+x[i+1]+x[i+2]+x[i+3];
        let indexNumber = encodes.indexOf(firstEncode);
        decoding += myChar[indexNumber];
    }

    return decoding;
}

export {Encoding,Decoding}