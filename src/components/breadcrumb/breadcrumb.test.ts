import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SlBreadcrumb from './breadcrumb';

// The default link color just misses AA contrast, but the next step up is way too dark. Maybe we can solve this in the
// future with a prefers-contrast media query.
const ignoredRules = ['color-contrast'];

describe('<sl-breadcrumb>', () => {
  let el: SlBreadcrumb;

  describe('when provided a standard list of el-breadcrumb-item children and no parameters', () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <sl-breadcrumb-item>Catalog</sl-breadcrumb-item>
          <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
          <sl-breadcrumb-item>Women's</sl-breadcrumb-item>
          <sl-breadcrumb-item>Shirts &amp; Tops</sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });

    it('should render sl-icon as separator', () => {
      expect(el.querySelectorAll('sl-icon').length).to.eq(4);
    });

    it('should attach aria-current "page" on the last breadcrumb item.', () => {
      const breadcrumbItems = el.querySelectorAll('sl-breadcrumb-item');
      const lastNode = breadcrumbItems[3];
      expect(lastNode).attribute('aria-current', 'page');
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "separator" to support Custom Separators', () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <span class="replacement-separator" slot="separator">/</span>
          <sl-breadcrumb-item>First</sl-breadcrumb-item>
          <sl-breadcrumb-item>Second</sl-breadcrumb-item>
          <sl-breadcrumb-item>Third</sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });

    it('should accept "separator" as an assigned child in the shadow root', () => {
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=separator]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should replace the sl-icon separator with the provided separator', () => {
      expect(el.querySelectorAll('.replacement-separator').length).to.eq(4);
      expect(el.querySelectorAll('sl-icon').length).to.eq(0);
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "prefix" to support prefix icons', () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <sl-breadcrumb-item>
            <span class="prefix-example" slot="prefix">/</span>
            Home
          </sl-breadcrumb-item>
          <sl-breadcrumb-item>First</sl-breadcrumb-item>
          <sl-breadcrumb-item>Second</sl-breadcrumb-item>
          <sl-breadcrumb-item>Third</sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });
  });

  describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "suffix" to support suffix icons', () => {
    before(async () => {
      el = await fixture<SlBreadcrumb>(html`
        <sl-breadcrumb>
          <sl-breadcrumb-item>First</sl-breadcrumb-item>
          <sl-breadcrumb-item>Second</sl-breadcrumb-item>
          <sl-breadcrumb-item>Third</sl-breadcrumb-item>
          <sl-breadcrumb-item>
            <span class="prefix-example" slot="suffix">/</span>
            Security
          </sl-breadcrumb-item>
        </sl-breadcrumb>
      `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible({ ignoredRules });
    });
  });
});
