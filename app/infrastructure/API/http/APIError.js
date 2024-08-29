class APIError extends Error {
  constructor(error) {
    if (
      typeof error === 'string' ||
      error.response?.data === undefined
    ) {
      const message = typeof error === 'string' ? error : 'General error';

      super(message);

      this.name = 'APIError';
      this.code = 1000;
      this.status = 500;
      this.data = null;
    } else {
      const errorResponse = error.response.data.error;
      const { message, code, status } = errorResponse;

      super(message);

      this.name = 'APIError';
      this.code = code;
      this.status = status;
      this.data = error.response.data;
    }
  }
}

export default APIError;
