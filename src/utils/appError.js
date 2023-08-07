class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400){
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError;

// Classe responsável de devolver uma mensagem e um status code no tratamento de excessões
//