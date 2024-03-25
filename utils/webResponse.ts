class WebResponse<T> {
  data: T;
  error: null | string;

  constructor(data: T, error: null | string) {
    this.data = data;
    this.error = error;
  }
}

export default WebResponse;
