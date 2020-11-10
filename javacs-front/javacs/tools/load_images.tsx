export class ImagesUtils {
    private static instance: ImagesUtils;
    private images: any = {
        logo: require("../assets/icon.png"),
        cute_robot: require("../assets/robots/cute_robot.png"),
        hi_robot: require("../assets/robots/hi_robot.png"),
        student: require("../assets/icons/student.png"),
        teacher: require("../assets/icons/teacher.png"),
        java: require("../assets/icons/java/java.png"),
        sintaxis: require("../assets/icons/java/sintaxis.png"),
        expressions: require("../assets/icons/java/expressions.png"),
        lost_robot: require("../assets/robots/lost_robot.png"),
        trash_robot: require("../assets/robots/trash_robot.png"),
        google_logo: require("../assets/icons/google-logo.png"),
        iron_robot: require("../assets/robots/iron_robot.png"),
        smart_robot: require("../assets/robots/smart_robot.png"),
        check: require("../assets/icons/check.png"),
        mature: require("../assets/robots/mature.png"),
        pdf: require("../assets/icons/pdf.png"),
        mp4: require("../assets/icons/mp4.png"),
        info_robot: require("../assets/robots/info_robot.png"),
        ant_robot: require("../assets/robots/ant_robot.png"),
        google_logo2: require("../assets/icons/google-logo.png")
    };

    constructor() {
        if (ImagesUtils.instance) {
            return ImagesUtils.instance;
        }
    }

    public static getInstance() {
        if (!ImagesUtils.instance) {
            ImagesUtils.instance = new ImagesUtils();
        }
        return ImagesUtils.instance;
    }

    /**
     * Return a object of the image loaded
     * @param imageName Name of the image to get of the load image array
     */
    public getImage(imageName: string) {
        return this.images[imageName];
    }
}