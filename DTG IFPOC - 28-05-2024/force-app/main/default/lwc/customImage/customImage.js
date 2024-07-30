import { LightningElement, api } from 'lwc';
import IMAGE_URL from '@salesforce/resourceUrl/ifpoc_assets';

const VIDEO = 'Video';
const IMAGE = 'Image';

export default class CustomImage extends LightningElement {
    @api resourceUrl;
    @api imgOrVideo;
    @api internalResource;
    @api overlay;
    @api opacity;

    get resUrl() {
        if (this.isImg) {
            if (this.internalResource) {
                return IMAGE_URL + this.resourceUrl;
            }
        }
        return this.resourceUrl;
    }

    get isVideo() {
        return this.imgOrVideo === VIDEO;
    }

    get isImg() {
        return this.imgOrVideo === IMAGE;
    }

    get isOverlay() {
        return this.overlay === 'true';
    }

    renderedCallback() {
        const overlay = this.template.querySelector('div');
        if (overlay) {
            overlay.style.opacity = parseInt(this.opacity, 10) / 10;
        }
    }
}