export default function Response(response, message, statusCode) {
	this.response = response || [];
	this.message = message || 'Success';
	this.statusCode = statusCode || 200;
}
