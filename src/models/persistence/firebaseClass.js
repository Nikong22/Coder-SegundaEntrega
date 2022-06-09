import admin from 'firebase-admin';
const {DATABASE_URL} = process.env;
const serviceAccount = {
	type: "service_account",
	project_id: "ecommerce-6795d",
	private_key_id: "7fc5e1a7b57556b17bb81c7437c89bbd9f73c32b",
	private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCaD6o9ds7ooXXw\nGH2Yk3QQ2RXbyfhxY3g/UZjgkcl15cVRe7bNin6FmAZZyfLoENS9LXJxpPrQw3zW\nDGBaCcrNi3cf4XelwHQUmJqLbtIxaMzWyFBijMBfx8s7+B0j83w4MJ/ckxHpuQ3+\nUUA7sGIOYEFroea+tdUoIhpwUmXHpi9zoReMip5Lt43XLNtOnxGNe+vjM60ehm/j\nZSJ2paudbWZYTtmmsPo3Me7AJKl+4kRQMQP7J5kALawm3nxR4YAFR63F2aD+8ea2\nLSvVCacWWFGHtUT9ihPg28LxKDJN/JoWCvJBGesjZIuFHQcZVqilmmQMEPhOVSfa\nzTMYgGm/AgMBAAECggEAOVaeNj0LOhKpyd/bktdCaejZ1VEAyfbK8MoGO4KW9+25\n+B8yxKIIf+E6b92VLeDhxLzu7LQJ83vmcOXvUGN3mvOOtQtd1A9iRK4dSsrGqUQH\nhOLN5Dfde2hpUBsCgXhkIaebP+Vu082fkykbXnvBqvcRMiVyM0WKnWK/81D/d4Pi\n6YvWjo2nXaCfL4azHVvBLc+RtYeF9O56LGRmDyjbQ+wZLrXyTp0auRFFUKFshSev\ntc42Aq2RmTzE+SLjwviKXnQDqn/+G59R1hRE8hXh2xKdWhwsKkjS02prr3I2CgLE\nz+rN6qlskANq/TAc/s1NEGnExObZX6WbVvnTM2ffTQKBgQDS8ckotexjh7BUgPzv\nFQJaKeiG3AiR+NRa5hEfODOaL4GwVGo2syLsupEX+NJMXD4/tIrNGDbkHtoDlN1Q\nkxcEZa+/LFzUAIZAzw7FAOVVMEYHLJpHx6ewMAj/9sBxpnKM7bQvNIj08lS3xfbg\nRiTFKpvlTS7+Swf5YKmI7/0ctQKBgQC695Aspwo6itlds66UmmRlt8XiAcQaj1qn\nWaE2aJ9Z/feUjBSx7tqWWId6WfOHzxxEEaKC7WCNxAD9IMPnmt9QFUO5x/BRYeGo\n0Pzrv/y17nEfesUcw/orxLWoGx2PcFyEycIC8h/m+VC91L9jgV/ZgJRXlH2FjNGG\nMSmj1mqpIwKBgBgjGHxzDKB65z9UHx0QT1uXzgaYaNajHVFlX/ItkSIEa5eMoTav\nGsDxvCZ9Dzszlt/dPcCoE6fYq+ObBhPxMMINDKYYYmrTwIjr6Gm8Z4Fu66RogyLR\ngquTY4Q+bNjUTek4TdTU8xLsI6t/mHcjL5PsAziis0zfswLi/6Muqsy9AoGAYi+6\njkiWzZG3f0bqau39xZFSIVOOGeio0fP2/qzI6qi+CUvbXmoybvxFAZMVmn/At1qP\nfrSMnUaOwmAfoZSqq9LPA1SltwdxS4edG21ymFSFIeQGegnNaojeYU8EIhz+6VlP\nQt7GtDTAG0EL1YTOwlmNDcVUefsu2Ysd9AWZdAMCgYAGsoWyyoRMNgLOMZramqXY\nxqLIloP+OMKBYKCvkkTj4zjjvK7gkwVZy3fGNXvZQyce7Y/92ieoh/OoWmieoT6E\nqGUsSqt3Gj1nCAa/f/7xktoQ79shIwVTMptFlkGzlMR+yl2LxWUzVnSQmpUTQ6QU\nmKz2IHvJsbDkymsT+kX4ZQ==\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-p7ee2@ecommerce-6795d.iam.gserviceaccount.com",
	client_id: "105911444630164607817",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p7ee2%40ecommerce-6795d.iam.gserviceaccount.com"
  };

export default function Firebase() {
	this.connection = admin;
	this.inicializateSchemas = async () => {
		let firebase = await admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: DATABASE_URL,
		});
		return `Conexión exitosa a ${firebase.options.credential.projectId}`;
	};
	this.create = async (objectName, items) => {
		let url = await this.connection.database().ref(objectName).push(items);
		return await this.connection.database().ref(url).once('value');
	};
	this.find = async (objectName) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.once('value');
		return snapshot.val();
	};
	this.findById = async (objectName, id) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName + '/' + id)
			.once('value');
		return snapshot.val();
	};

	this.update = async (objectName, id, items) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.set(items);
		return await this.connection
			.database()
			.ref(objectName + '/' + id)
			.once('value');
	};
	this.remove = async (objectName, id) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.remove();
		return 1;
	};
	this.validateId = () => {}; // optional
	this.validateDataType = () => {}; // optional
}
