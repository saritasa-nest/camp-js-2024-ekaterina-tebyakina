/**  */
export type ImageDataToUploadingDto = {

	/** */
	readonly url: string;

	/** */
	readonly params: {

		/** */
		success_action_status: string;

		/** */
		['Content-Disposition']: string;

		/** */
		['x-amz-meta-user-id']: string;

		/** */
		['x-amz-meta-config-name']: string;

		/** */
		['Content-Type']: string;

		/** */
		key: string;

		/** */
		['x-amz-security-token']: string;

		/** */
		['x-amz-algorithm']: string;

		/** */
		['x-amz-credential']: string;

		/** */
		['x-amz-date']: string;

		/** */
		policy: string;

		/** */
		['x-amz-signature']: string;
	};
};
