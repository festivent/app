export class GenderHelper
{
    // Genders
    static MALE: string = 'male';
    static FEMALE: string = 'female';

    /**
     * Get all genders.
     *
     * @returns {Array<string>}
     */
    static all(): Array<string>
    {
        return [
            this.FEMALE,
            this.MALE
        ]
    }
}