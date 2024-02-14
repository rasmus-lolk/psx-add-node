import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  AddNode,
  InsertionEnum,
  ProgramPresenter,
  ProgramPresenterAPI,
  RobotSettings
} from '@universal-robots/contribution-api';
import {ApproachNode} from './approach.node';
import {first} from 'rxjs/operators';
import {TreeContext} from "@universal-robots/contribution-api/lib/types/context";

@Component({
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ApproachComponent implements OnChanges, ProgramPresenter {
  // presenterAPI is optional
  @Input() presenterAPI: ProgramPresenterAPI;

  // robotSettings is optional
  @Input() robotSettings: RobotSettings;
  // contributedNode is optional
  @Input() contributedNode: ApproachNode;

  @Input() programTree: TreeContext;

  constructor(
    protected readonly translateService: TranslateService,
    protected readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.robotSettings) {
      if (!changes?.robotSettings?.currentValue) {
        return;
      }

      if (changes?.robotSettings?.isFirstChange()) {
        if (changes?.robotSettings?.currentValue) {
          this.translateService.use(changes?.robotSettings?.currentValue?.language);
        }
        this.translateService.setDefaultLang('en');
      }

      this.translateService
        .use(changes?.robotSettings?.currentValue?.language)
        .pipe(first())
        .subscribe(() => {
          this.cd.detectChanges();
        });
    }
  }

  // call saveNode to save node parameters
  async saveNode() {
    this.cd.detectChanges();
    await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
  }

  async createSibling() {
    const approachNode = await this.presenterAPI.builder.createNode('smooth-robotics-smooth-tools-approach');
    const parentNode = await this.programTree.ancestors.next();

    await this.presenterAPI.programNodeService.addChildNode({
      insertionRelativeToPivotNode: InsertionEnum.INTO_FIRST,
      pivotNodeId: this.presenterAPI.selectedNodeId,
      node: approachNode,
    });
  }
}
