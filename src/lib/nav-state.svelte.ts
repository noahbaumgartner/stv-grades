let mobileOpen = $state(false);

export function getNavState() {
	return {
		get mobileOpen() {
			return mobileOpen;
		},
		set mobileOpen(value: boolean) {
			mobileOpen = value;
		},
		toggleMobile() {
			mobileOpen = !mobileOpen;
		}
	};
}
