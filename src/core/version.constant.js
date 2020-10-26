let version;
try {
    version = __VERSION__;
} catch (e) {
    version = '';
}

export default version;